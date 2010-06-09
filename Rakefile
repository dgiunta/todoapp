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

  puts_title 'Cucumber'
  exit unless system 'cucumber -f progress features/'
  
  puts_title 'RSpec'
  system 'spec spec/'

end