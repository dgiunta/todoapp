module WhatsNext
  module Views
    class Index < Layout
      
      module TodoInstanceMethods        
        def checked_attribute
          status == :completed ? 'checked="checked"' : ''
        end
      end
      
      def todos
        @todos.map { |todo| todo.extend TodoInstanceMethods }
      end
      
    end
  end
end