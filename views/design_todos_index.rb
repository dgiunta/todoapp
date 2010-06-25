module WhatsNext
  module Views
    class DesignTodosIndex < Layout
      
      def todos
        todos = [
          { :title => 'Take out the trash',                             :checked_attribute => 'checked' },
          { :title => 'Do the dishes',                                  :checked_attribute => 'checked' },
          { :title => 'Clean the kat litter',                           :checked_attribute => 'checked' },
          { :title => 'Find a lightning talk presenter',                :checked_attribute => '' },
          { :title => 'Find a main presenter',                          :checked_attribute => '' },
          { :title => 'Get a Refresh Chicago DBA',                      :checked_attribute => '' },
          { :title => 'Create and submit the Refresh expense report',   :checked_attribute => '' },
          { :title => 'Send Jon&rsquo;s parents a thank you',           :checked_attribute => '' },
          { :title => 'Get groceries',                                  :checked_attribute => '' },
        ]
        
        todos.each_with_index { |t, i| todos[i][:id] = i }
      end
      
    end
  end
end