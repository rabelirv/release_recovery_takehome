class Api::V1::CheckInsController < ApplicationController
  def index
    check_ins = CheckIn.includes(:user).all
    render json: check_ins
  end

  def show
    check_in = CheckIn.includes(:user).find(params[:id])
    render json: check_in
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Check-in not found" }, status: :not_found
  end

  def create
    check_in = CheckIn.new(check_in_params)
    if check_in.save
      render json: check_in, status: :created
    else
      render json: { errors: check_in.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    check_in = CheckIn.find(params[:id])
    if check_in.update(check_in_params)
      render json: check_in
    else
      render json: { errors: check_in.errors.full_messages }, status: :unprocessable_entity
    end
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Check-in not found" }, status: :not_found
  end

  def destroy
    check_in = CheckIn.find(params[:id])
    check_in.destroy
    head :no_content
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Check-in not found" }, status: :not_found
  end

  private

  def check_in_params
    params.require(:check_in).permit(:user_id, :date, :mood, :craving_level, :attended_meeting, :fresh_start, :notes)
  end
end
