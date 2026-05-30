#!/usr/bin/env node

/*
 * Updates the FAQ's "Should I upgrade?" section to mention a new
 * security-relevant Git for Windows version.
 *
 * Usage: node update-faq-security-version.js <display-version>
 *
 * Example: node update-faq-security-version.js '2.53.0(3)'
 */

const fs = require('fs')
const path = require('path')

const die = (msg) => {
	process.stderr.write(msg + '\n')
	process.exit(1)
}

const version = process.argv[2]
if (!version) die('Usage: node update-faq-security-version.js <display-version>')

const faqPath = path.join(__dirname, 'content', 'faq.md')
const faq = fs.readFileSync(faqPath, 'utf-8')

const marker = 'it is *highly* advisable to upgrade.'
const re = /^(If you have a version older than )\S+?(, it is \*highly\* advisable to upgrade\. A couple of Git versions came with important fixes to security-relevant vulnerabilities: )(.*)$/m
const match = faq.match(re)
if (!match) die('Could not find the security-versions line in content/faq.md')

const existingList = match[3]
if (existingList.startsWith(version + ',') || existingList.startsWith(version + ' ')) {
	process.stderr.write(version + ' is already listed; nothing to do.\n')
	process.exit(0)
}

const updated = faq.replace(re, `$1${version}$2${version}, ${existingList}`)
fs.writeFileSync(faqPath, updated)
process.stderr.write('Updated FAQ to recommend upgrading to at least ' + version + '\n')
