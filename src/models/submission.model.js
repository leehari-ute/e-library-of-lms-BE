const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const submissionSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    submit: [{ id: String, ans: Array || String, correct: Array || String }],
    score: Number,
    correctNum: Number,
    bank: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Bank' },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
submissionSchema.plugin(toJSON);
submissionSchema.plugin(paginate);

submissionSchema.pre('save', async function (next) {
  next();
});

/**
 * @typedef Submission
 */
const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;
