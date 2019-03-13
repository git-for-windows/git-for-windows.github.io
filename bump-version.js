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

var updateVersion = function(version, tag, timestamp, url) {
	var regex = /<div class="version">.*?<\/div>/gm;
	var replacement = '<div class="version"><a href="' + url
		+ '" title="Version ' + version + ' was published on '
		+ timestamp + '" tabindex="3">Version ' + version + '</a></div>';
	fs.writeFile('latest-version.txt', version);
	fs.writeFile('latest-tag.txt', tag);
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
		var release = JSON.parse(body),
			versionRegex = /^v(\d+\.\d+\.\d+(\.\d+)?)\.windows\.(\d+)/,
			timeRegex = /^(\d+)-(\d+)-(\d+)T(\d+):(\d+):(\d+)Z$/,
			version = false,
			match, latest, url;

		if (match = release.tag_name.match(versionRegex)) {
			version = match[1];

			if (parseInt(match[3]) > 1) {
				version += '(' + match[3] + ')';
			}

			match = release.published_at.match(timeRegex);
			latest = new Date(match[1], match[2] - 1, match[3],
				match[4], match[5], match[6], 0).toUTCString();
			latest = latest.replace(/GMT$/, 'UTC');
			url = release.html_url;
		}

		process.stderr.write('Auto-detected version ' + version
			+ ' (' + latest + ')\n');
		return [ version, release.tag_name, latest, url ];
	};

	var https = require('https');
	https.body = '';
	https.get({
		'hostname': 'api.github.com',
		'path': '/repos/git-for-windows/git/releases/latest',
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
			updateVersion(result[0], result[1], result[2], result[3]);
		});
	});
};

if (process.argv.length == 3 && '--auto' == process.argv[2])
	autoUpdate();
else if (process.argv.length == 6)
	updateVersion(process.argv[2], process.argv[3], process.argv[4], process.argv[5]);
else
	die('Usage: node ' + process.argv[1]
		+ ' <version> <tag> <timestamp> <url>\n');
