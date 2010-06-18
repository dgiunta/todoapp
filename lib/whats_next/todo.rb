module WhatsNext
  class Todo
    
    include Mongoid::Document
    
    field :status, :default => 'pending'
    field :title
    
    def status
      str = read_attribute :status
      str.blank? ? nil : str.to_sym
    end
        
  end
end