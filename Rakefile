def puts_title title
  puts "\n\n"
  puts "===================================================="
  puts title  
  puts "===================================================="
  puts "\n"
end



task :default => :test

desc 'Run the entire test suite'
task :test do
  system 'clear'
  
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
      system %|rbind to app.rb features/ lib/ spec/ templates/ views/ -e 'system "rake test"'|
    end
  end
  
  desc 'Run the Cucumber specs' 
  task :cucumber do
    puts_title 'Cucumber'
    exit unless system 'cucumber -f progress features/'
  end
  
  desc 'Run the RSpec specs' 
  task :rspec do
    puts_title 'RSpec'
    exit unless system 'spec spec/'
  end
  
end