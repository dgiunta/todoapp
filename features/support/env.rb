ENV['RACK_ENV'] = 'test'

require File.dirname(__FILE__) + '/../../app'
require 'capybara/cucumber'
require 'spec'

World do
  
  Capybara.app = Sinatra::Application
  Capybara.default_selector = :css
  
  include Capybara
  include Spec::Expectations
  include Spec::Matchers
  
end