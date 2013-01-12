#!/usr/bin/python
import json, datetime, cgi, time, re, urllib, sys, string, time
# Import parsedatetime library from http://github.com/bear/parsedatetime.git
import pdt

LOG_PATH = '/home/asegars/applogs/quictic.com/query/'
LOG_FILE = LOG_PATH + datetime.datetime.now().strftime("%Y.%m.%d") + '.log'

# Print a standard JSON header.
def add_header(msg):
	msg.append("Content-type: text/json")
	msg.append("")

# Extract the query parameter.
def get_string(msg):
	args = cgi.FieldStorage()
	
	try:
		return urllib.unquote(args['str'].value)
	except KeyError:
		msg.append(json.dumps({ 'error_text' : 'No query string provided.', 'error_code': 1}))
		return None

def log_query(query, translation, code):
	with open(LOG_FILE, 'ab+') as f:
		now = datetime.datetime.now()
		f.write('%s\t%s\t%s\t%s\n' % (now.strftime("%H:%M:%S"), query, translation, code))	
		f.flush()

def write_out(msg):
	print '\n'.join(msg)

# Parse the input string and provide a struct_time object as output
#
# INPUT: 
#   query = string that was provided to the CGI script
#   msg   = message queue that will be printed at the end of execution
#
# OUTPUT:
#   struct_time object
def parse(query, msg):
	date = None
	query = st2_replace(st1_substitute(query))
			
	c = pdt.Calendar()
	dt = None

	result, what = c.parse(query)

    # TODO: Get rid of timezone and DST settings.
	if what == 1:
		dt = datetime.datetime( *result[:6] )
		dt.replace(hour=0, minute=0, second=0, microsecond=0, tzinfo=None)
	elif what == 2:
		dt = datetime.datetime( *result[:6] )
		dt.replace(tzinfo=None)
	elif what == 3:
		result = datetime.datetime.fromtimestamp(time.mktime(result))
		dt = result.replace(tzinfo=None)
	else:
		msg.append(json.dumps({ 'orig' : query, 'date': None}))

	# If the dt is before now, try adding a day ([7pm] will default to 
	# today, but should default to tomorrow).
	if dt is not None and dt < datetime.datetime.now():
		 dt = dt + datetime.timedelta(days=1)
		 # If its still before now, report none. Negative timedeltas
		 # don't make sense for countdowns.
		 if dt < datetime.datetime.now():
			 return None
	return dt

# Stage 1: substitions
# Reduce character and word variations to common form.
def st1_substitute(query):
	return query.lower().translate(string.maketrans("", ""), string.punctuation)

# Stage 2: Replacements
def st2_replace(query):
	now = time.localtime()
	
	# Common replacements
	query = re.sub('dee', 'day', query)

	# Holidees, etc
	if now.tm_mon == 12 and now.tm_mday > 25:
		query = re.sub('christmas', '12/25/' + str(now.tm_year + 1), query)
	else:
		query = re.sub('christmas', '12/25/' + str(now.tm_year), query)
	
	return query

def main():
	start_time = time.time()
	message = []
	
	add_header(message)
	query_string = get_string(message)
	sys.stderr.write( 'query_string = %s\n' % query_string )
	
	# If there's no query string then call it off.
	if query_string is None:
		write_out(message)
		log_query('none', '', 'no_query')
	
		# Write to log
		return

	parsed_date = parse(query_string, message)
	
	if parsed_date is None:
		write_out(message)
		log_query(query_str, 'unknown', 'unknown')
		
		# Write to log
		return
	
	date_str = parsed_date.strftime("%Y%m%d@%H%M%S")
	message.append(json.dumps({ 'date' : date_str, 'orig' : query_string, 'runtime' : '%.5f' % (time.time() - start_time) }))

	# Write to log
	write_out(message)
	log_query(query_string, date_str, 'success')

if __name__ == '__main__':
	main()
