#!/usr/bin/python
import json, datetime, cgi, time, re
# Import parsedatetime library from http://github.com/bear/parsedatetime.git
import pdt

# Print a standard JSON header.
def add_header(msg):
	msg.append("Content-type: text/json")
	msg.append("")

# Extract the query parameter.
def get_string(msg):
	args = cgi.FieldStorage()
	
	try:
		return args['str'].value
	except KeyError:
		msg.append(json.dumps({ 'error_text' : 'No query string provided.', 'error_code': 1}))
		return None

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
	
	now = time.localtime() # Current time
	
	if 'christmas' in query:
		if now.tm_mon == 12 and now.tm_mday > 25:
			query = re.sub('christmas', '12/25/' + str(now.tm_year + 1), query)
		else:
			query = re.sub('christmas', '12/25/' + str(now.tm_year), query)
			
	c = pdt.Calendar()
	dt = None

	result, what = c.parse(query)

	if what in (1, 2):
		dt = datetime.datetime( *result[:6] )
	elif what == 3:
		dt = result
	else:
		msg.append(json.dumps({ 'orig' : query, 'date': None}))

	return dt
		
def main():
	start_time = time.time()
	message = []
	
	add_header(message)
	query_string = get_string(message)
	
	# If there's no query string then call it off.
	if query_string is None:
		write_out(message)
		return

	parsed_date = parse(query_string, message)
	
	if parsed_date is None:
		write_out(message)
		return
	
	date_str = parsed_date.strftime("%Y%m%d@%H%M%S")
	message.append(json.dumps({ 'date' : date_str, 'orig' : query_string, 'runtime' : time.time() - start_time }))

	write_out(message)

if __name__ == '__main__':
	main()
