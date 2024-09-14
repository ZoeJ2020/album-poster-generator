from flask import Flask, redirect
import cgi
form = cgi.FieldStorage()
searchterm =  form.getvalue('user-input')

redirect("/")

print(searchterm)