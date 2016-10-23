json = require('json')

function link(userId) 
	local user = box.space.users:get({ userId })

	-- check status
	if user[5] ~= 'idle' then
		return failJson({ 'user is not idle' })
	end

	-- set status
	box.space.users:update(user[1], {{ '=', 5, 'waiting' }})
	box.space.waitingUsers:insert({ user[1] })

	-- find opponent
	local opponent = nil
	
	while not opponent do
		-- check if only you is active
		if box.space.waitingUsers.index.primary:count() <= 1 then
			return failJson({ 'no one else is waiting' })
		end

		opponent = box.space.waitingUsers.index.primary:random(os.time())

		if opponent[1] == user[1] then 
			opponent = nil
		end
	end

	-- link together
	box.space.waitingUsers:delete(user[1])
	user = box.space.users:update(user[1], {{ '=', 5, 'talking' }, { '=', 6, opponent[1] }})

	box.space.waitingUsers:delete(opponent[1])
	opponent = box.space.users:update(opponent[1], {{ '=', 5, 'talking' }, { '=', 6, user[1] }})

	return successJson({ user = getUserObject(user), opponent = getUserObject(opponent) })
end

function unlinkAndStop(userId)
	local user = box.space.users:get({ userId })

	if user[5] == 'talking' then
		user = unlink(userId)
	end

	if user[5] == 'waiting' then
		box.space.waitingUsers:delete(user[1])
	end

	user = box.space.users:update(user[1], {{ '=', 5, 'idle' }})

	return successJson(getUserObject(user))
end

function next(userId)
	local user = box.space.users:get({ userId })

	-- check status
	if user[5] ~= 'talking' then
		return failJson({ 'user is not talking' })
	end

	unlink(userId)
	return link(userId)
end

function getUser(vendor, vendorUserId, name)
	local user = box.space.users.index.vendor:get({ vendor, vendorUserId })

	if not user then
		user = box.space.users:auto_increment({ vendor, vendorUserId, name, 'idle' })
	end

	return successJson(getUserObject(user))
end

function getUserById(userId)
	local user = box.space.users:get({ userId })

	if not user then
		return failJson({ 'user not found' })
	end

	return successJson(getUserObject(user))
end

function unlink(userId)
	local user = box.space.users:get({ userId })

	if user[5] ~= 'talking' then 
		return failJson({ 'user is not talking' })
	end

	if user[6] then
		local opponent = box.space.users:get({ user[6] })
		opponent = box.space.users:update(opponent[1], {{ '=', 5, 'waiting' }, { '=', 6, 0 }})
	end

	user = box.space.users:update(user[1], {{ '=', 5, 'waiting' }, { '=', 6, 0 }})
	return user
end 

function successJson(result)
	return json.encode({ success = true, result = result })
end

function failJson(errorList)
	return json.encode({ success = false, errorList = errorList })
end

function getUserObject(user)
	if not user then return nil end
	return { id = user[1], vendor = user[2], vendorUserId = user[3], name = user[4], status = user[5], opponent = user[6]}
end
