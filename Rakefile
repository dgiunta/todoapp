ROOT = File.expand_path File.dirname(__FILE__) unless defined?(ROOT)

require 'json'

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
    system "rake #{ task }"
    puts "\n"
    # puts "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
    # puts "\n"
    puts "Waiting for your changes..."
    puts "Ctrl+C to exit"
    puts "\n"
    system %| rbind to #{ paths } -e 'system "rake #{ task }" ; puts "\n"' |
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
  
  desc 'Build the Mustache template JS file'
  task :mustache do
    File.open "#{ ROOT }/public/javascripts/whats_next/templates.js", "w" do |file| 
      templates = Dir["#{ ROOT }/templates/**/*.mustache"].inject({}) do |hash, path|
        key = path.gsub(/(#{ ROOT }\/templates|\.mustache)/, '')
        hash[key] = File.read path
        hash
      end
      file.write "WhatsNext.Mustache.Templates = #{ templates.to_json };"
    end
    done 'Built the Mustache templates.'
  end
  
  namespace :mustache do
  
    desc 'Build the Mustache template JS file automatically as the templates change'
    task :auto do
      auto_task :'build:mustache', 'templates/'
    end
      
  end
  
  desc 'Build all Sass files'
  task :sass do
    options = (ENV['RACK_ENV'] == 'production') ? '--style compressed' : '-l'
    system "sass #{ options } --update ./sass:./public/stylesheets"
    done 'Built the Sass files.'
  end
  
  namespace :sass do
    
    desc 'Build all Sass files automatically as they change'
    task :auto do
      auto_task :'build:sass', 'sass/'
    end
  
  end
  
end

desc 'Deploy the app'
task :deploy do
  system %| git push; ssh dreamhost 'cd ~/whats_next && git pull && rake build' |
end
