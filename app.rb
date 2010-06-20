# Note the application’s root directory for convenience
ROOT = File.expand_path File.dirname(__FILE__) unless defined?(ROOT)

# Require bundled gems
require 'rubygems'
require 'bundler'
Bundler.require :default, ( ENV['RACK_ENV'] || :development ).to_sym

# Require each file in lib
Dir[ROOT + '/lib/*.rb'].each { |file| require file }

# Require stuff needed for Mustache
require 'mustache/sinatra'
require ROOT + '/views/layout'


module WhatsNext
  class App < Sinatra::Base
  
    register Mustache::Sinatra

    configure do
      set :root, ROOT
      
      set :mustache,  :namespace => WhatsNext, 
                      :templates => 'templates/', 
                      :views     => 'views/'
      
      set :mongo_host,     ENV['MONGO_HOST'] || 'localhost'
      set :mongo_db,       ENV['MONGO_DB']   || "whats_next_#{ environment }"
      set :mongo_port,     ENV['MONGO_PORT'] || Mongo::Connection::DEFAULT_PORT
      set :mongo_user,     ENV['MONGO_USER']
      set :mongo_password, ENV['MONGO_PASSWORD']

      Mongoid.database = Mongo::Connection.new(mongo_host, mongo_port).db mongo_db
      Mongoid.database.authenticate mongo_user, mongo_password if mongo_user
    end
  
    get '/' do
      mustache :index
    end
    
    get '/todos' do
      @todos = WhatsNext::Todo.all
      mustache :todos_index
    end

  end
end