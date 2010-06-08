ENV['RACK_ENV'] = 'test'

require File.dirname(__FILE__) + '/../../app'
require 'capybara/cucumber'
require 'spec'

World do
  
  Capybara.app = WhatsNext::App
  Capybara.default_selector = :css
  
  include Capybara
  include Spec::Expectations
  include Spec::Matchers
  
end