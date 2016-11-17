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

var updateVersion = function(version, timestamp, url, ver_sub) {
	var regex = /<div class="version">.*?<\/div>/gm;
	var replacement = '<div class="version"><a href="' + url
		+ '" title="Version ' + version + ' was published on '
		+ timestamp + '">Version ' + version + '</a></div>';
	fs.readFile('index.html', 'utf8', function (err, data) {
		if (err)
			die(err);
		data = data.replace(regex, replacement);
		fs.writeFile('index.html', data);

		makeStaticPages(version, ver_sub);
	});
};

var makeStaticPages = function(version, ver_sub) {
	var sep = require('path').sep;
	var url_pre = 'https://github.com/git-for-windows/git/releases/download/';
	var dist =	[
					'Git-latest-32-bit.exe',
					'Git-latest-32-bit.tar.bz2',
					'Git-latest-64-bit.exe',
					'Git-latest-64-bit.tar.bz2',
					'MinGit-latest-32-bit.zip',
					'MinGit-latest-64-bit.zip',
					'PortableGit-latest-32-bit.7z.exe',
					'PortableGit-latest-64-bit.7z.exe'
				];
	var url_full;

	for (var i = 0; i < dist.length; i++) {
		url_full = url_pre + version + '.windows.' + ver_sub + '/' + dist[i].replace(/-latest-/, '-' + version + '-');
		fs.writeFile('static' + sep + dist[i] + '.txt', url_full);
	}
}

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

	var determineVersion = function(json) {
		var releases = JSON.parse(json),
			ver_match = /^v(\d+\.\d+\.\d+(\.\d+)?)\.windows\.(\d+)/,
			pub_match = /^(\d+)-(\d+)-(\d+)T(\d+):(\d+):(\d+)Z$/,
			version = false,
			ver_sub = '',
			match, latest, url;

		for (var i = 0; i < releases.length && !version; i++) {
		    if (match = releases[i].tag_name.match(ver_match)) {
				version = match[1];
				ver_sub = match[3];

				if (parseInt(match[3]) > 1) {
					version += '(' + ver_sub + ')';
				}

				match = releases[i].published_at.match(pub_match);
				latest = new Date(match[1], match[2] - 1, match[3],
					match[4], match[5], match[6], 0).toUTCString();
				latest = latest.replace(/GMT$/, 'UTC');
				url = releases[i].html_url;
		    }
		}

		process.stderr.write('Auto-detected version ' + version
			+ ' (' + latest + ')\n');

		return [ version, latest, url,  ver_sub];
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
			updateVersion(result[0], result[1], result[2], result[3]);
		});
	});
};

if (process.argv.length == 3 && '--auto' == process.argv[2])
	autoUpdate();
else if (process.argv.length == 5)
	updateVersion(process.argv[2], process.argv[3], process.argv[4], '');
else
	die('Usage: node ' + process.argv[1]
		+ ' <version> <timestamp> <url>\n');
