ROOT = File.expand_path File.dirname(__FILE__) unless defined?(ROOT)

begin
  require 'growl'
rescue LoadError
end

def auto_task task, paths
  begin
    require 'bind'
  rescue LoadError
    puts "\n\n`gem install bind` to run tasks automatically"
  else
    puts "\n"
    system %|rake #{ task }|
    puts "\n"
    puts "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
    puts "\n"
    puts "Waiting for your changes..."
    puts "Ctrl+C to exit"
    puts "\n"
    system %|rbind to #{ paths } -e 'system "rake #{ task }"'|
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

def done message
  puts "#{ Time.now.strftime('%X') } - #{ message }"
end



desc 'Build all static files'
task :build => [ :'build:mustache', :'build:sass' ]

namespace :build do
  
  desc 'Build the Mustache JS files'
  task :mustache do
    File.open "#{ ROOT }/public/javascripts/mustache_views.js", "w" do |file|
      Dir["#{ ROOT }/views/**/*.js"].each do |view|
        contents = File.read(view) + "\n\n"
        file.write contents
      end
    end
    done 'Built the Mustache views.'
  end
  
  desc 'Build the Mustache JS files automatically as they change'
  task :'mustache:auto' do
    auto_task :'build:mustache', 'templates/ views/'
  end
  
  desc 'Build the Sass files'
  task :sass do
    system 'sass sass/application.sass public/stylesheets/application.css'
    done 'Built the Sass files.'
  end
  
  desc 'Build the Sass files automatically as they change'
  task :'sass:auto' do
    auto_task :'build:sass', 'sass/'
  end
  
end


