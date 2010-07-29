ROOT = File.expand_path File.dirname(__FILE__) unless defined?(ROOT)

require 'json'

begin
  require 'jasmine'
  load 'jasmine/tasks/jasmine.rake'
rescue
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

def done message
  puts "#{ Time.now.strftime('%X') } - #{ message }"
end



desc 'Build all static files'
task :build => [ :'build:sass', :'build:templates', :'build:app' ]
namespace :build do
  
  desc 'Build the app JS'
  task :app do
    File.open "#{ ROOT }/public/javascripts/whats_next.js", "w" do |file| 
      contents = Dir["#{ ROOT }/app/**/*.js"].inject('') do |str, path|
        str << ( "\n\n" + File.read(path) )
      end
      file.write <<-JS
      
if ( !$defined(WhatsNext) ) var WhatsNext = {};

(function(_) {
  #{ contents }
})(WhatsNext);

      JS
    end
    done 'Built the app JS file.'
  end

  namespace :app do
  
    desc 'Build the app JS automatically as the app files change'
    task :auto do
      auto_task :'build:app', 'app/'
    end
  
  end
  
  desc 'Build Sass files'
  task :sass do
    options = (ENV['RACK_ENV'] == 'production') ? '--style compressed' : '-l'
    system "sass #{ options } --update ./sass:./public/stylesheets"
    done 'Built the Sass files.'
  end
  
  namespace :sass do
    
    desc 'Build Sass files automatically as they change'
    task :auto do
      auto_task :'build:sass', 'sass/'
    end
  
  end
  
  desc 'Build templates JS file'
  task :templates do
    File.open "#{ ROOT }/app/templates.js", "w" do |file| 
      templates = Dir["#{ ROOT }/templates/**/*.mustache"].inject({}) do |hash, path|
        key = path.gsub(/(#{ ROOT }\/templates|\.mustache)/, '')
        hash[key] = File.read path
        hash
      end
      file.write "WhatsNext.Templates = #{ templates.to_json };"
    end
    done 'Built the templates.'
  end

  namespace :templates do
  
    desc 'Build templates JS file automatically as the templates change'
    task :auto do
      auto_task :'build:templates', 'templates/'
    end
  
  end
  
end

desc 'Deploy the app'
task :deploy do
  system %| git push; ssh dreamhost 'cd ~/whats_next && git pull && rake build' |
end