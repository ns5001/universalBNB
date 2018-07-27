class ServicesController < ApplicationController

  def show
    # I want to be able to pass in the service object
    @service = Service.find_by_id(params[:id])
  end

end
