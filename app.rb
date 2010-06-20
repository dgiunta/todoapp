# Note the application’s root directory for convenience
ROOT = File.expand_path File.dirname(__FILE__) unless defined?(ROOT)

# Require bundled gems
require 'rubygems'
require 'bundler'
Bundler.require :default, ( ENV['RACK_ENV'] || :development ).to_sym

# Require each file in lib
Dir[ROOT + '/lib/**/*.rb'].each { |file| require file }

# Require stuff needed for Mustache
require 'mustache/sinatra'
require ROOT + '/views/layout'


module WhatsNext
  class App < Sinatra::Base
  
    register Mustache::Sinatra, Sinatra::MongoidConfig

    configure do
      set :root, ROOT
      
      set :mustache,  :namespace => WhatsNext, 
                      :templates => 'templates/', 
                      :views     => 'views/'
      
      set :mongo_db, "whats_next_#{ environment }"
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