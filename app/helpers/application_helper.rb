module ApplicationHelper
    def show_search_button?
      controller_name == 'open_ai' && action_name == 'index'
    end
  end
