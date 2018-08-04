# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 21170130204509) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "connections", force: :cascade do |t|
    t.integer "user_id"
    t.integer "receiver_id"
    t.boolean "status",      default: false
  end

  create_table "messages", force: :cascade do |t|
    t.integer "user_id"
    t.string  "content"
    t.boolean "reply",             default: false
    t.integer "connection_id"
    t.integer "receiver_id"
    t.integer "master_message_id"
  end

  create_table "services", force: :cascade do |t|
    t.string   "service_type"
    t.text     "detail"
    t.string   "name"
    t.integer  "price"
    t.integer  "user_id"
    t.boolean  "purchased"
    t.string   "location"
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
    t.string   "picture_file_name"
    t.string   "picture_content_type"
    t.integer  "picture_file_size"
    t.datetime "picture_updated_at"
  end

  create_table "user_services", force: :cascade do |t|
    t.integer  "seller_id"
    t.integer  "buyer_id"
    t.integer  "service_id"
    t.boolean  "final",      default: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                    default: "", null: false
    t.string   "encrypted_password",       default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",            default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "firstName"
    t.string   "lastName"
    t.integer  "age"
    t.string   "gender"
    t.string   "bio"
    t.string   "username"
    t.integer  "rating"
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
    t.string   "profile_pic_file_name"
    t.string   "profile_pic_content_type"
    t.integer  "profile_pic_file_size"
    t.datetime "profile_pic_updated_at"
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

end
