class ProductsController < ApplicationController
  before_action :authenticate_admin!
  def show
    @product = Product.find(params[:id])
  end

  private

  # If you don’t use Devise's built-in authenticate_admin!, implement like this:
  def authenticate_admin!
    unless admin_signed_in?
      redirect_to new_admin_session_path, alert: "Please log in as admin to continue."
    end
  end
end
