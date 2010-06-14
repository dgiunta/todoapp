begin
  require 'growl'
rescue LoadError
end

def auto_task task, paths
  begin
    require 'bind'
  rescue LoadError
    puts "\n\n`gem install bind` to run suite automatically"
  else
    system %|clear && rake #{ task }|
    puts "\n\n"
    puts "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
    puts "\n"
    puts "Waiting for your changes..."
    puts "Ctrl+C to exit"
    puts "\n"
    system %|rbind to #{ paths } -e 'system "clear && rake #{ task }"'|
  end
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



task :default => :suite
desc 'Run the Cucumber features' 
task :cucumber do
  run_test 'Cucumber', 'cucumber -f progress features/'
end

namespace :cucumber do
  desc 'Automatically run Cucumber features as files change'
  task :auto do
    auto_task :cucumber, 'app.rb features/ lib/ templates/ views/'
  end
end

desc 'Run the RSpec specs' 
task :spec do
  run_test 'RSpec', 'spec spec/'
end

namespace :spec do
  desc 'Automatically run RSpec specs as files change'
  task :auto do
    auto_task :spec, 'app.rb lib/ spec/ templates/ views/'
  end
end

desc 'Run the entire test suite'
task :suite do
  [ :cucumber, :spec ].each { |task| Rake::Task[task].invoke }
end

namespace :suite do
  desc 'Automatically run entire test suite as files change'
  task :auto do
    auto_task :suite, 'app.rb features/ lib/ spec/ templates/ views/'
  end
end


