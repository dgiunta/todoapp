ENV['RACK_ENV'] = 'test'

# Sinatra app
require File.dirname(__FILE__) + '/../../app'



# 
# Webrat configuration
# 

require 'webrat'
require File.dirname(__FILE__) + '/paths'

Webrat.configure do |config|
  config.mode = :rack
end

# Disable Webrat logging
module Webrat::Logging
  def debug_log(message) ; end
end



# 
# Cucumber configuration
# 

require 'spec/expectations'
require 'rack/test'

World do
  
  include Rack::Test::Methods
  include Webrat::Methods
  include Webrat::Matchers
  include Webrat::HaveTagMatcher
  
  def app
    Sinatra::Application
  end

  Webrat::Methods.delegate_to_session :response
  
end