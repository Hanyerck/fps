async function sleep( MS = 1000 / 60 ){
	return new Promise(R => setTimeout( R, Math.max( MS, 1 ) ) );
};

function start( MS = 1000, callback = () => {} ){
	let IsStop = false,
	stop = () => IsStop = true,
	self = { MS, stop, count: 0 },
	call = callback.bind( self );
	return (async () => {
		while( !IsStop ){
			new Promise( R => call( self ) );
			await sleep( self.MS );
			self.count++;
		}
	})(), self;
};

var self1 = start( 1000, function update( self ){
	console.log('updated-1.', '1s', self  );
});

var self2 = start( 5000, function update( self ){
	console.log('updated-2.', '5s', self );
});
