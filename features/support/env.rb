ENV['RACK_ENV'] = 'test'

# Sinatra app
require File.dirname(__FILE__) + '/../../app'

require 'capybara'
require 'capybara/cucumber'
require 'spec'

World do
  
  Capybara.app = Sinatra::Application
  
  include Capybara
  include Spec::Expectations
  include Spec::Matchers
  
end