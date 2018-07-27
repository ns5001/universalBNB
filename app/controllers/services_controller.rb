class ServicesController < ApplicationController

  def show
    binding.pry
    @service = Service.find_by_id(params[:id])
  end

end
