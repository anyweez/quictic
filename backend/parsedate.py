#!/usr/bin/python
import json, datetime, cgi

def add_header(msg):
	msg.append("Content-type: text/json")
	msg.append("")
	 
def get_string(msg):
	args = cgi.FieldStorage()
	
	try:
		return args['str'].value
	except KeyError:
		msg.append(json.dumps({ 'error_text' : 'No query string provided.', 'error_code': 1}))
		return None

def write_out(msg):
	print '\n'.join(msg)

def parse(query, msg):
	date = None
	
	if query == 'christmas':
		date = '12/25'
	
	if date is None:
		msg.append(json.dumps({ 'orig' : query, 'date': None}))
		return None
	else:
		return datetime.datetime.now()
		
def main():
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
	message.append(json.dumps({ 'date' : date_str, 'orig' : query_string}))

	write_out(message)

if __name__ == '__main__':
	main()
