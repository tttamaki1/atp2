require 'rails_helper'

RSpec.describe "Hotels", type: :request do

  describe "GET /hotel" do
    it "returns http success" do
      get "/hotels/hotel"
      expect(response).to have_http_status(:success)
    end
  end

end
