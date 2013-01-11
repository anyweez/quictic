#!/usr/bin/python

import cgi

def main():
	print "Content-type: text/json"
	print ""
	print "{ 'response' : 5 }"
	
	arguments = cgi.FieldStorage()
	for i in arguments.keys():
		print arguments[i].value

if __name__ == '__main__':
	main()
