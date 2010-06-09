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
  %w[ cucumber rspec ].each do |task|
    Rake::Task["test:#{ task }"].invoke
  end
end

namespace :test do
  
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