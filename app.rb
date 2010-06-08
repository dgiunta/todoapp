# Note the application's root directory for convenience
ROOT = File.expand_path File.dirname(__FILE__) unless defined?(ROOT)

# Require bundled gems
require 'rubygems'
require 'bundler'
Bundler.require :default, ( ENV['RACK_ENV'].to_sym || :development )
require 'mustache/sinatra'

# Make sure that layout view gets loaded before others
require ROOT + '/views/layout'



class WhatsNext::App < Sinatra::Base
  
  register Mustache::Sinatra  

  configure do
    set :root, ROOT
    set :mustache, { :namespace => WhatsNext, :templates => 'templates/', :views => 'views/' }
  end
  
  get '/' do
    mustache :index
  end

end