require File.dirname(__FILE__) + '/whats_next/todo'

module WhatsNext
  
  def self.database= database
    @database = database
  end
  
  def self.database
    @database
  end
  
end