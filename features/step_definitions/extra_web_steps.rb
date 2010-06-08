Then /^(?:|I )should (see|not see) (?:|a|the) "([^\"]*)" element$/ do |see, selector|
  method_name = (see == 'see') ? :have_css : :have_no_css
  page.should send(method_name, selector)
end

Then /^(?:|I )should (see|not see) the following(?:| content):$/ do |see, table|
  table.raw.each do |row|
    Then %|I should #{ see } "#{ row[0] }"|
  end
end

Then /^(?:|I )should (see|not see) the following elements:$/ do |see, table|
  table.raw.each do |row|
    Then %|I should #{ see } a "#{ row[0] }" element|
  end
end

Then /^(?:|I )should (see|not see) the following content and elements:$/ do |table|
  table.raw.each do |row|
    Then %|I should #{ see } "#{ row[0] }" within "#{ row[1] }"|
  end
end
