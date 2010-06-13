module WhatsNext
  class Todo
    
    attr_accessor :title
    attr_reader :id
    
    def initialize attributes = {}
      @title = attributes[:title]
    end
    
    def save
      begin
        @id = self.class.collection.insert 'title' => @title
        true
      rescue Exception
        false
      end
    end
    
    def self.all
      self.collection.find.to_a
    end
    
    def self.collection
      @collection ||= WhatsNext.database.collection 'todos'
    end
    
    def self.create attributes = {}
      todo = new(attributes)
      todo.save
      todo
    end
    
  end
end