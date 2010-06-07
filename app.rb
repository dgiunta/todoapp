# Note the application's root directory for convenience
ROOT = File.expand_path File.dirname(__FILE__) unless defined?(ROOT)

# Require bundled gems
require 'rubygems'
require 'bundler'
Bundler.require :default, ( ENV['RACK_ENV'].to_sym || :development )



# 
# Configuration
#

configure do
  set :root, ROOT
  enable :inline_templates
end



# 
# Helpers
# 

helpers do
end



# 
# Routes
# 

get '/' do
  erb :index
end



__END__



@@ index

<!DOCTYPE html>

<html>

  <head>
    <title>To-Do App</title>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
  </head>

  <body>
    Hello from the To-Do App!
  </body>

</html>