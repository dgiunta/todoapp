# Note the application’s root directory for convenience
ROOT = File.expand_path File.dirname(__FILE__) unless defined?(ROOT)

# Require bundled gems
require 'rubygems'
require 'bundler'
Bundler.require :default, ( ENV['RACK_ENV'].to_sym || :development )

# Require everything in lib
Dir[ROOT + '/lib/**/*.rb'].each { |file| require file }

# Require stuff needed for Mustache
require 'mustache/sinatra'
require ROOT + '/views/layout'


module WhatsNext
  class App < Sinatra::Base
  
    register Mustache::Sinatra, Sinatra::MongoConfig 

    configure do
      set :mongo_db, 'whats_next'
      set :mustache, :namespace => WhatsNext, :templates => 'templates/', :views => 'views/'
      set :root, ROOT
    end
  
    get '/' do
      mustache :index
    end

  end
end