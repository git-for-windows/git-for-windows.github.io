#!/usr/bin/env node

/*
 * This is a simple script to update the versions in Git for Windows'
 * home page.
 */

var fs = require('fs');

var die = function(err) {
	process.stderr.write(err + '\n');
	process.exit(1);
};

var updateVersion = function(version, timestamp, url) {
	var regex = /<div class="version">.*?<\/div>/gm;
	var replacement = '<div class="version"><a href="' + url
		+ '" title="Version ' + version + ' was published on '
		+ timestamp + '">Version ' + version + '</a></div>';
	fs.readFile('index.html', 'utf8', function (err, data) {
		if (err)
			die(err);
		data = data.replace(regex, replacement);
		fs.writeFile('index.html', data);
	});
};

var autoUpdate = function() {
	Array.prototype.lastElement = function() {
		return this[this.length - 1];
	}

	Array.prototype.filterRegex = function(regex) {
		return this.map(function(value) {
			var match = value.match(regex);
			if (!match)
				return undefined;
			return match.lastElement();
		}).filter(function (value) {
			return value !== undefined;
		});
	};

	Array.prototype.findFirst = function(regex) {
		var matches = this.filterRegex(regex);
		return matches && matches[0];
	};

	var determineVersion = function(body) {
		var lines = body.replace(/\n/gm, ',').split(',');
		var tagName = lines.findFirst(/"tag_name": *"(.*)"/);
		var regex = /^v(\d+\.\d+\.\d+(\.\d+)?)\.windows\.(\d+)$/;
		var match = regex.exec(tagName);
		var version = match[1];
		if (parseInt(match[3]) > 1)
			version += '(' + match[3] + ')';
		var timestamp = lines.findFirst(/"published_at": *"(.*)"/);
		regex = /^(\d+)-(\d+)-(\d+)T(\d+):(\d+):(\d+)Z$/;
		match = regex.exec(timestamp);
		var latest = new Date(match[1], match[2] - 1, match[3],
			match[4], match[5], match[6], 0).toUTCString();
		latest = latest.replace(/GMT$/, 'UTC');
		var url = lines.findFirst(/"html_url": *"(.*)"/);
		process.stderr.write('Auto-detected version ' + version
			+ ' (' + latest + ')\n');
		return [ version, latest, url ];
	};

	var https = require('https');
	https.body = '';
	https.get({
		'hostname': 'api.github.com',
		'path': '/repos/git-for-windows/git/releases',
		'headers': {
			'User-Agent': 'Git for Windows version updater'
		}
	}, function(res) {
		if (res.statusCode != 200)
			die(res);
		res.on('data', function(data) {
			https.body += data.toString();
		});
		res.on('end', function() {
			var result = determineVersion(https.body);
			updateVersion(result[0], result[1], result[2]);
		});
	});
};

if (process.argv.length == 3 && '--auto' == process.argv[2])
	autoUpdate();
else if (process.argv.length == 5)
	updateVersion(process.argv[2], process.argv[3], process.argv[4]);
else
	die('Usage: node ' + process.argv[1]
		+ ' <version> <timestamp> <url>\n');

