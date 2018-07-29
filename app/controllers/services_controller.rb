class ServicesController < ApplicationController

  def show
    binding.pry
    @service = Service.find_by_id(params[:id])
  end

  def index
    respond_to do |format|
      format.json { render json: Service.all}
    end
  end

end
