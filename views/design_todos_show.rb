module WhatsNext
  module Views
    class DesignTodosShow < Layout
      
      def tags
        tags = [
          { :title => 'Errand' },
          { :title => 'Errand: Groceries' },
          { :title => 'Home' },
          { :title => 'Refresh Chicago' },
          { :title => 'Refresh Chicago: May 2010' },
          { :title => 'Refresh Chicago: June 2010', :checked_attribute => 'checked' },
          { :title => 'Work' },
        ]
        
        tags.each_with_index do |t, i| 
          tags[i][:id] = i
        end
      end
      
    end
  end
end