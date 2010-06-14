Given /^a "([^\"]*)" todo(?: with a status of "([^\"]*)")$/ do |title, status|
  attributes = { :title => title }
  attributes[:status] = status if status
  
  WhatsNext::Todo.create attributes
end

Given /^the following todos:$/ do |table|
  table.raw.each do |row|
    Given %|a "#{ row[0] }" todo with a status of "#{ row[1] }"|
  end
end