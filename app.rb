# Note the application's root directory for convenience
ROOT = File.expand_path File.dirname(__FILE__) unless defined?(ROOT)

# Require bundled gems
require 'rubygems'
require 'bundler'
Bundler.require :default, ( ENV['RACK_ENV'].to_sym || :development )
require 'mustache/sinatra'



class TodoApp < Sinatra::Base
  
  register Mustache::Sinatra  
  require ROOT + '/views/layout'

  configure do
    set :root, ROOT
    set :mustache, { :templates => 'templates/', :views => 'views/' }
  end
  
  # 
  # Routes
  # 

  get '/' do
    mustache :index
  end

end