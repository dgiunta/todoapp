#\ -E none -p 9292

FileUtils.mkdir_p 'log' unless File.exists?('log')
log = File.new 'log/sinatra.log', 'a'
STDOUT.reopen log
STDERR.reopen log

require File.dirname(__FILE__) + '/app'

use Rack::ShowExceptions

run WhatsNext::App.new