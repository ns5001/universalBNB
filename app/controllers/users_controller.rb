class UsersController < ApplicationController

  def index
    respond_to do |format|
      format.json { render json: User.all}
    end
  end

end
