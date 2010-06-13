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
      
      set :mongo,     :db        => 'whats_next',
                      :host      => 'localhost',
                      :password  => nil,
                      :port      => Mongo::Connection::DEFAULT_PORT,
                      :user      => nil
      
      WhatsNext.database = Mongo::Connection.new( mongo[:host], mongo[:port] ).db( mongo[:db] + environment.to_s )
      WhatsNext.database.authenticate mongo[:user], mongo[:password] if mongo[:user] and mongo[:password]
    end
  
    get '/' do
      mustache :index, :locals => { :todos => WhatsNext::Todo.all }
    end

  end
end