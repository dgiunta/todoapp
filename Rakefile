begin
  require 'growl'
rescue LoadError
end

def growl_notify title, passed
  return unless defined?(Growl) and Growl.installed?
  
  messages = {
    true => [
      'Great job!',
      'Greeaat jeeooorrrb, Am Scray!',
      'Gimme five!',
      'Nice work!',
      'Hell yes!',
      'That’s what I’m talkin’ about!' 
    ],
    false => [
      'Oh noes!',
      'Well that sucks.',
      'Again? Really!?',
      '“Woop!” says DHH.' 
    ]
  }
  
  message = messages[passed].sort_by { rand(321) }.first
  title   = "#{ title } #{ passed ? 'Passed' : 'Failed' }"
  image   = passed ? 'green' : 'red'
  
  Growl.notify message, :title => title, :icon => ( File.dirname(__FILE__) + "/features/support/images/#{ image }.png" )
end

def run_test title, command
  puts "\n\n"
  puts "===================================================="
  puts title  
  puts "===================================================="
  puts "\n"
  
  if system command
    growl_notify title, true
  else
    growl_notify title, false
    exit
  end
end



task :default => :test

desc 'Run the entire test suite'
task :test do
  %w[ cucumber rspec ].each do |task|
    Rake::Task["test:#{ task }"].invoke
  end
end

namespace :test do
  
  desc 'Automatically run entire suite as files change'
  task :auto do
    begin
      require 'bind'
    rescue LoadError
      puts "\n\n`gem install bind` to run suite automatically"
    else
      puts "\n\n"
      puts "Waiting for your changes..."
      puts "Ctrl+C to exit"
      puts "\n"
      system %|rbind to app.rb features/ lib/ spec/ templates/ views/ -e 'system "clear && rake test"'|
    end
  end
  
  desc 'Run the Cucumber specs' 
  task :cucumber do
    run_test 'Cucumber', 'cucumber -f progress features/'
  end
  
  desc 'Run the RSpec specs' 
  task :rspec do
    run_test 'RSpec', 'spec spec/'
  end
  
end