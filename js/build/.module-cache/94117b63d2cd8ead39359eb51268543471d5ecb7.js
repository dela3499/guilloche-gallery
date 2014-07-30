/** @jsx React.DOM */

// Simple pure-React component so we don't have to remember
// Bootstrap's classes
var BootstrapButton = React.createClass({displayName: 'BootstrapButton',
  render: function() {
    // transferPropsTo() is smart enough to merge classes provided
    // to this component.
    return this.transferPropsTo(
      React.DOM.a({href: "javascript:;", role: "button", className: "btn"}, 
        this.props.children
      )
    );
  }
});

var BootstrapModal = React.createClass({displayName: 'BootstrapModal',
  // The following two methods are the only places we need to
  // integrate with Bootstrap or jQuery!
  componentDidMount: function() {
    // When the component is added, turn it into a modal
    $(this.getDOMNode())
      .modal({backdrop: 'static', keyboard: false, show: false})
  },
  componentWillUnmount: function() {
    $(this.getDOMNode()).off('hidden', this.handleHidden);
  },
  close: function() {
    $(this.getDOMNode()).modal('hide');
  },
  open: function() {
    $(this.getDOMNode()).modal('show');
  },
  render: function() {
    var confirmButton = null;
    var cancelButton = null;

    if (this.props.confirm) {
      confirmButton = (
        BootstrapButton({
          onClick: this.handleConfirm, 
          className: "btn-primary"}, 
          this.props.confirm
        )
      );
    }
    if (this.props.cancel) {
      cancelButton = (
        BootstrapButton({onClick: this.handleCancel}, 
          this.props.cancel
        )
      );
    }

    return (
      React.DOM.div({className: "modal hide fade"}, 
        React.DOM.div({className: "modal-header"}, 
          React.DOM.button({
            type: "button", 
            className: "close", 
            onClick: this.handleCancel, 
            dangerouslySetInnerHTML: {__html: '&times'}}
          ), 
          React.DOM.h3(null, this.props.title)
        ), 
        React.DOM.div({className: "modal-body"}, 
          this.props.children
        ), 
        React.DOM.div({className: "modal-footer"}, 
          cancelButton, 
          confirmButton
        )
      )
    );
  },
  handleCancel: function() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  },
  handleConfirm: function() {
    if (this.props.onConfirm) {
      this.props.onConfirm();
    }
  }
});

var Example = React.createClass({displayName: 'Example',
  handleCancel: function() {
    if (confirm('Are you sure you want to cancel?')) {
      this.refs.modal.close();
    }
  },
  render: function() {
    var modal = null;
    modal = (
      BootstrapModal({
        ref: "modal", 
        confirm: "OK", 
        cancel: "Cancel", 
        onCancel: this.handleCancel, 
        onConfirm: this.closeModal, 
        title: "Hello, Bootstrap!"}, 
          "This is a React component powered by jQuery and Bootstrap!"
      )
    );
    return (
      React.DOM.div({className: "example"}, 
        modal, 
        BootstrapButton({onClick: this.openModal}, "Open modal")
      )
    );
  },
  openModal: function() {
    this.refs.modal.open();
  },
  closeModal: function() {
    this.refs.modal.close();
  }
});

React.renderComponent(Example(null), document.getElementById('jqueryexample'));
