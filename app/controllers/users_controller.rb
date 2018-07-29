class UsersController < ApplicationController

  def index
    respond_to do |format|
      format.json { render json: User.all}
    end
  end

  def show
    @user = current_user
  end

end
