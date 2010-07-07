module WhatsNext
  module Views
    class DesignTodosIndex < Layout
      
      def todos
        todos = [
          { :title => 'Take out the trash' },
          { :title => 'Do the dishes' },
          { :title => 'Clean the cat litter' },
          { :title => 'Find a lightning talk presenter' },
          { :title => 'Find a main presenter' },
          { :title => 'Get a Refresh Chicago DBA' },
          { :title => 'Create and submit the Refresh Chicago expense report with receipts' },
          { :title => 'Send Jon&rsquo;s parents a thank you' },
          { :title => 'Get groceries' },
          { :title => 'Take out the trash' },
          { :title => 'Do the dishes' },
          { :title => 'Clean the cat litter' },
          { :title => 'Find a lightning talk presenter' },
          { :title => 'Find a main presenter' },
          { :title => 'Get a Refresh Chicago DBA' },
          { :title => 'Create and submit the Refresh Chicago expense report with receipts' },
          { :title => 'Send Jon&rsquo;s parents a thank you' },
          { :title => 'Get groceries' },
          { :title => 'Take out the trash' },
          { :title => 'Do the dishes' },
          { :title => 'Clean the cat litter' },
          { :title => 'Find a lightning talk presenter' },
          { :title => 'Find a main presenter' },
          { :title => 'Get a Refresh Chicago DBA' },
          { :title => 'Create and submit the Refresh Chicago expense report with receipts' },
          { :title => 'Send Jon&rsquo;s parents a thank you' },
          { :title => 'Get groceries' },
        ]
        
        todos.each_with_index do |t, i| 
          todos[i][:id] = i
          todos[i][:checked_attribute] = 'checked' if i < 4
        end
        
        todos.insert 7, { :separator => true }
        
        todos
      end
      
    end
  end
end