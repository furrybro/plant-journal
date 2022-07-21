class Api::V1::EntriesController < ApplicationController
  # before_action :set_entry, only: %i[ show edit update destroy ]

  # GET /entries or /entries.json
  def index
    entries = Entry.all
    render json: entries
  end

  # GET /entries/1 or /entries/1.json
  def show
    entry = Entry.where(organism_id: params[:id])
    render json: entry
  end

  # POST /entries or /entries.json
  def create
    entry = Entry.create!(entry_params)
    render json: entry, status: :created
  end

  # PATCH/PUT /entries/1 or /entries/1.json
  def update
    entry = find_entry
    entry.update!(entry_params)
    render json: entry
  end

  # DELETE /entries/1 or /entries/1.json
  def destroy
    entry = find_entry
    entry.destroy
    head :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def find_entry
      Entry.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def entry_params
      params.permit(:note, :date, :organism_id)
    end
end
