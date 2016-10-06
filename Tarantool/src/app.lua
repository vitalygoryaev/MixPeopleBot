#!/usr/bin/env tarantool

box.cfg {
	listen=3301,
	slab_alloc_arena=0.2
}

box.schema.user.passwd('admin', os.getenv("ADMIN_PASSWORD"))

box.once('create_user_for_nodejs', function()
		box.schema.user.create('worker', { password = os.getenv("WORKER_PASSWORD") })
		box.schema.user.grant('worker','read,write,execute','universe')
end)

box.once('create_users_space', function()
		box.schema.space.create('users')
		box.space.users:create_index('primary', { type = 'tree', unique = true, parts = { 1, 'unsigned' }})
		box.space.users:create_index('vendor', { type = 'hash', unique = true, parts = { 2, 'str', 3, 'unsigned' }}) -- vendor, vendor's userId
end)

box.once('create_waitingUsers_space', function()
		box.schema.space.create('waitingUsers')
		box.space.waitingUsers:create_index('primary', { type = 'tree', unique = true, parts = { 1, 'unsigned' }})
end)

require('functions')
