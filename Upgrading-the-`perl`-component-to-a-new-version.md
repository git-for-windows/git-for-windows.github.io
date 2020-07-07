One of the many components included in Git for Windows' SDK is the `perl` package. Upgrading to a new Perl version is unfortunately a bit more involved than only following the advice in [Building new package versions](Building-new-package-versions). In addition to adjusting the patches applied via the `PKGBUILD` script, the major problem with Perl is that its DLL embeds the Perl version in its file name.

As a consequence, _all_ native Perl modules are broken immediately after upgrading to a new major Perl version. As far as Git for Windows is concerned, the affected components are:

- subversion
- perl-Net-SSLeay
- perl-HTML-Parser
- perl-TermReadKey
- perl-Locale-Gettext
- perl-XML-Parser
- perl-YAML-Syck

Therefore, immediately after a successful upgrade of the `perl` component to a new major Perl version (as of time of writing, the most recent such upgrade was to v5.32.0), these components have to be rebuilt, typically by forcing an incremented `pkgrel`.